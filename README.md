# Maglev controller's resolver

This module exposes a resolver allowing controllers auto-discovery in maglev applications. This is a convention module.

### Accepted filenames and paths

* `app/controllers/profile.js`
* `app/controllers/profileController.js`
* `app/controllers/profile_controller.js`

### Application phase usage

```javascript

(new maglev.Application())

  // default maglev conventions
  .phase(maglev.boot.controllers())

  // or

  // custom Limbo conventions
  .phase(maglev.boot.controllers({
    resolver: controllersResolver
  }))

  ...

  .boot(function (err) { ... })

;

```
