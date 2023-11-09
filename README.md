> **Warning**
>
> This version will be removed in the future

This version is created exclusively for deployment on Azure and is certainly not intended for local launch. The need for it arose due to the impossibility of hosting two applications at once (which we get when running docker compose) with the ability to access both, and installing nginx could not solve the problem, since Azure only offered the ability to specify the config for docker, but not download separate config for nginx.

Another option was to buy built-in proxies, which replaced nginx, but this option would require additional funds
