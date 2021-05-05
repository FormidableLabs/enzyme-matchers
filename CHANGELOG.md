8.0.0
=====
  * Added support for react 17. (@alandeivson, @iagocaldeira)


7.1.2
=====
  * Fix a typescript conflict with a recent Jest update. (@tobilen)
  * Internal cleanup with jest compatibility. (@vkrol)
  * Internal updates to latest Babel and Jest. (@vkrol)
  * Fix documentation linking issues (@harrykiselev)

7.1.1
=====
  * Fix a flowtype regression. (@bz2)
  * Improve infra to prevent further flowtype regressions. (@bz2)

7.1.0
=====
  * `toContainMatchingElement` and `toContainMatchingElements` now can take a list of Enzyme wrappers. (@GreenGremlin)
  * Improved messaging for `toContainMatchingElement` and `toContainMatchingElements`. (@GreenGremlin)

7.0.2
=====
  * Update a security advisory within dependencies. (@tgaff)
  * Various package improvements. (@goldensunliu, @mulholio, @kahwee, @tgaff)
  * Fixing messaging for `toHaveState` and `toHaveProp`. (@GreenGremlin)

7.0.1
=====
  * Fix a jest integration with `toContainMatchingElement` not returning an explicit boolean. (@blainekasten)

7.0.0
=====
🛑 **Breaking**
  * Renamed `toHaveTagName` to `toHaveDisplayName` (GreenGremlin)
    - This was done because Tag name indicates an HTML entity, but the matcher works with React Components which uses an internalProp `displayName`
    - When updating to 7.0.0 you should be able to just do a simple search and replace for this matcher across your codebase.

🍾 **Improvements**
  * Add support for unboxed properties for `toMatchElement`. (@blainekasten)
  * Improve documentation for the entire repo. (@blainekasten)
  * Improve internal tests.


6.1.2
=====
  * Try to fix a failed publish. (@blainekasten)

6.1.1
=====
  * Fix duplicate typescript definition. (@GreenGremelin)

6.1.0
=====
  * Added 3 new matchers! `toContainMatchingElement`, `toContainMatchingElements` and `toContainMatchingElements` (@GreenGremlin)

6.0.5
=====
  * Fix typescript definitions for `toMatchElement` options argument. (@mayhewluke)

6.0.4
=====
  * Fix global typescript definitions for jest-environment-enzyme. (@vkrol)

6.0.3
=====
  * Add global typescript definitions for jest-environment-enzyme. (@astorije)
  * Allow multiline strings for `toHaveHTML`. (@astorije)
  * Print local error messages when jest-environment-enzyme has an issue. (@h.ayabe)

6.0.2
=====
  * Loosen `jest-envirnoment-enzyme` react peerDependency to support testing other react versions. (@evocateur)

6.0.1
=====
  * Fix `jest-environment-enzyme` to actually work with different react adapter versions. (@evocateur)

6.0.0
=====
🛑 **Breaking**
  * `jest-environment-enzyme` now requires you to install your enzyme-adapter to your project root. (@blainekasten)
    - In 5.0.0 we wrongfully didn't require developers to do that hoping we could manage it internally.
    - This resulted in bloated dependencies, and peerDependency errors.
    - This fix requires a tiny bit more work from the user but is correct!

🍾 **Improvements**
  * Improve `jasmine-enzymes` error messages to not be contradicting. (@blainekasten)

5.0.3
=====
  * Fix an internal flowtype issue. (@fernandopasik)

5.0.2
=====
  * Improve the scope of what files `eslint-config-jest-enzyme` affects. (@blainekasten)

5.0.1
=====
  * Remove unnecassary rAF polyfill. (@SimenB)
  * Fix flow typing for `toHaveProp`. (@theneva)
  * Remove unused dependency from `jest-environment-enzyme`. (@SimenB)

5.0.0
=====
🛑 **Breaking**
  * Removed `toBePresent` and `toBeEmpty` in favor of a _new_ matcher `toExist`. (@blainekasten)

🚀 **New Features** 
  * New Package! [`jest-environment-enzyme`](/packages/jest-environment-enzyme) (@blainekasten)
  * New Package! [`eslint-config-jest-enzyme`](/packages/eslint-config-jest-enzyme) (@blainekasten)
  * New Matcher `toBeEmptyRender` to assert when a component returns `null` or `undefined`. (@theneva)
  * `toHaveStyle`, `toHaveProp` and `toHaveState` now all can accept an object as a list of key,values to match against. (@blainekasten)
  * Using `yarn` workspaces locally now. (@blainekasten)

🍾 **Improvements**
  * Improved error message when using an `enzyme-matcher` assertion with a non-enzyme argument. (@blainekasten)
  * Improve the message output from `toHaveClassName`. (@theneva)
  * `toBeChecked` previously failed on undefined or null values, but is now fixed. (@pascalduez)

4.2.0
=====
  * Handle an array of styles in the `toHaveStyle` assertion (@dennis-tra)

4.1.1
=====
  * Transfer ownership to [FormidableLabs](http://formidable.com/open-source/)

4.1.0
=====
  * Internal CI fixes (@blainekasten)
  * **Minor**: `toMatchElement` ignores props by default now. This should not break anyones existing tests. If it does, _please report it_.
    If you want to test an element without matching the props, pass `{ ignoreProps: false }` as a second argument. (@finnigantime)

4.0.2
=====
  * Update enzyme-to-json to support React 16.2 (@rtymchyk)

4.0.1
=====
  * Remove the dependency on @types/react (@Vinnl)

4.0.0
=====
  * Support React 16 and Enzyme 3 (@blainekasten)
  * Remove beforeEnter call for jest-enzyme and just add the matchers once. (@mockdeep)

3.8.3
=====
  * Fix missing flow annotation that caused issues with flow 0.54. (@fabiob)

3.8.2
=====
  * Fix flow issues that cropped up from 3.8.1. (@blainekasten)

3.8.1
=====
  * Fix a bug that prevents this library from working with Jest 21+. (@nigelzor)

3.8.0
=====
  * Intentionally passing undefined to toHaveState and toHaveProps now compares on the undefined value. (@DianaSuvorova)

3.7.0
=====
  * Fix pretty printing Proxy objects in components (@chris-divvito)
  * Fix negative messages in jasmine-enzyme (@blainekasten)
  * Address some internal issues that broke tests in CI (@blainekasten)

3.6.1
=====
  * Fix a bad publish with 3.6.0 not including all documented changes

3.6.0
=====
  * Implement jest asymettric matchers and jasmine partial matchers!! (@sfargier)
    - This means you can use API's like `expect.any(String)` in jest or `jasmine.stringMatching('%')`
  * Fix a bug with the transpiled code not runnable in browsers (@ek5000)
  * Make the typescript definition for jest-enzyme more accurate (@sfargier)
  * _internal_: enzyme-matchers is built in Prettier now! (@blainekasten)
  * _internal_: Fix a local issue with our yarn.lock (@blainekasten)

3.5.3
=====
  * Point to lib TS file (@pascalduez)

3.5.2
=====
  * Add the missing export of the toMatchElement assertion (@vkrol)

3.5.1
=====
  * Fix the TS definition for `toContainReact` (@pselden)

3.5.0
=====
  * Include TS definitions in exported library (@Dean177)
  * Fix a bug that can occur when you are mocking console.error in your tests. (@juanca)
  * [internal] Use babel-preset-env (@pascalduez)
  * [internal] Improve flowtype usage (@pascalduez)

3.4.0
=====
  * Add toMatchElement TS Declaration (@pascalduez)
  * Prevented `toHaveProps` from mutating arguments (@moredip)
  * Ensure flowtypes are published as part of the packages (@pascalduez)

3.3.0
=====
  * Fix typescript return types (@Dean177)
  * Fix Flowtype integration by not publishing `src/` files (@SBoudrias)
  * NEW! Added `toMatchElement(reactInstance)` matcher (@finnigantime)

3.2.0
=====
  * Publish types for Flow integration support
  * Fix an issue where `console` may not be available in certain environments
  * Expose matchers directly for `jasmine-enzyme`
    * This is particularily benefecial for jasmine v1 users
    * Access if found at `jasmineEnzyme.enzymeMatchers`
  * Fix an issue with using shallow wrappers when running tests in IE

3.1.1
=====
  * Fix a bug when running tests in IE

3.1.0
=====
  * Add Typescript definitions

3.0.1
=====
  * Fix a failed version publish

3.0.0
=====
  * This version updates the requirement for jest-enzyme to jest versions 19 or greater
  * Automatically inject a serializer for enzyme components to be snapshotted
  * Bugfix: Prevent shallow wrappers from being deeply rendered by our internal `html` utils

2.1.2
=====
  * Remove dependency on colors package
  * Fix stringify to not crash on `null` values

2.1.1
=====
  * Fix the way we looked up internals of react for latest version

2.1.0
=====
  * Fix matcher messages from always sounding positive, even when negated

2.0.0
=====
  * **Changed project structure!**
  * We are now using lerna to maintain 3 npm packages:
    * `enzyme-matchers` (_simple functions to handle assertions_)
    * `jasmine-enzyme` (_implementation of enzyme-matchers in jasmine_)
    * `jest-enzyme` (_implementation of enzyme-matchers in jest)

  * This is only breaking if you use Jest.
    * If you do, simply change to use the `jest-enzyme` package and everything should work.


1.2.0
=====
  * Fixed negated matchers output message to sound negated.

1.1.0
=====
  * Add `toHaveText` matcher

1.0.1
=====
  * Include `repository` in package.json

1.0.0
=====
  * Rename `toContain` to `toContainReact` to prevent core matcher overwrite
  * Rename `toMatch` to `toMatchSelector` to prevent core matcher overwrite

0.2.3
=====
  * Remove `jasmine` from the `peerDependencies` list
    * Jasmine is implicity with the library
    * the peerDep caused issues with npm2 and jest

0.2.2
=====
0.2.1 was a failed release
  * Fix flowtype issues

0.2.0
=====
  * Add `toHaveStyle` matcher

0.1.0
=====
  * Initial Implementation
