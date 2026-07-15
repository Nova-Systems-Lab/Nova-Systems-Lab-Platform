# Security Policy

## Reporting a vulnerability

Please do not report security vulnerabilities through public GitHub issues, discussions, pull requests, or social-media posts.

Send a private report to:

**security@novasystemslab.org**

Include, where possible:

- the affected component or URL;
- a clear description of the issue;
- steps to reproduce it;
- the potential impact;
- screenshots, logs, or proof-of-concept material that do not expose unrelated data;
- suggested remediation, when available;
- your preferred contact details.

## Responsible disclosure

Please:

- avoid accessing, modifying, downloading, or deleting data that is not your own;
- avoid privacy violations, service disruption, denial-of-service testing, social engineering, spam, and physical attacks;
- use the minimum testing necessary to demonstrate the issue;
- keep the vulnerability confidential while it is being investigated;
- provide reasonable time for remediation before public disclosure.

Nova Systems Lab will make a good-faith effort to:

- acknowledge a valid report;
- investigate and assess its severity;
- provide progress updates when practical;
- remediate confirmed issues according to risk and available resources.

## Scope

Unless explicitly authorized in writing, security testing is limited to systems operated by Nova Systems Lab.

Third-party platforms and infrastructure providers have their own security policies and vulnerability-reporting programs. Do not test Render, Neon, Cloudflare, Google, GitHub, or other third-party services through Nova Systems Lab assets.

## No authorization for destructive testing

This policy does not authorize:

- denial-of-service or load testing;
- credential attacks;
- phishing or social engineering;
- malware deployment;
- destructive database operations;
- accessing other users' accounts or private data;
- persistence after demonstrating a vulnerability;
- testing that violates applicable law or third-party terms.

## Sensitive information

Do not include production secrets, personal information, or unrelated user data in reports. Redact sensitive values whenever possible.

## Supported versions

The actively deployed production version and the current `main` branch receive security attention. Historical commits, abandoned branches, local forks, and unofficial deployments may not be supported.

## Public recognition

Nova Systems Lab may acknowledge researchers who provide helpful reports, but only with their permission. A bounty or financial reward is not promised unless explicitly agreed in writing before the work.
