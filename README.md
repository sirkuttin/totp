# TOTP with a password manager that doesn't support TOTP 😅

## Overview

Some password managers don't
support [TOTP](https://en.wikipedia.org/wiki/Time-based_One-Time_Password).

This usually requires falling back to an authenticator app like Authy or Google
Authenticator. Unless you like to swim against the current 🌊🏊 and you
want to "hack" your password manager to store TOTP secrets in it
somehow.

The cool app that you're looking at right now is making it easy for you
to "hack" your password manager in this way.

## How does it work?

Put in a plaintext TOTP secret and in the name field put int a good name for the service and submit the form.

Putting in a meaningful value as the username will be useful for your password vault. this is especially true for when setting up MFA for multiple services using this website. 

At that point, the app will generate a one-time password matching the
secret that was just added, and copy it to clipboard.

Now, because your password manager stored your TOTP secret like it's a
normal password for this website, anytime you come back to it (usually
when you need a one-time password) and focus the password field, it'll
happily autocomplete amongst all the saved TOTP secrets that you have
added in the past. Then you can click the big blue button and get your
one-time password copied to clipboard. 😋
