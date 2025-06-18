import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore
import FBSDKCoreKit  // <-- Import Facebook SDK

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {

 // Initialize Facebook SDK
    ApplicationDelegate.shared.application(
      application,
      didFinishLaunchingWithOptions: launchOptions
    )

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "Nectar",
      in: window,
      launchOptions: launchOptions
    )
    FirebaseApp.configure()
    showSplashScreen()
    
    return true
  }

// Add this method to handle Facebook login redirect URL
  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    return ApplicationDelegate.shared.application(
      app,
      open: url,
      options: options
    )
  }


   private func showSplashScreen() {
        DispatchQueue.main.async {
            if let splashClass = NSClassFromString("SplashView") as? NSObject.Type,
               let splashInstance = splashClass.perform(NSSelectorFromString("sharedInstance"))?.takeUnretainedValue() as? NSObject {
                splashInstance.perform(NSSelectorFromString("showSplash"))
            }
        }
    }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
