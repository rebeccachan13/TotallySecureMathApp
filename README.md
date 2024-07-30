# Security Assessment of the Totally Secure Math App

This document offers a thorough security assessment of the Totally Secure Math app, identifying and describing several vulnerabilities that could impact the app's security.

## Types of Vulnerabilities

1. [Insecure Data Storage](#insecure-data-storage)
2. [Improper Authentication](#improper-authentication)
3. [Code Injection](#code-injection)
4. [Insufficient Input Validation](#insufficient-input-validation)
5. [Insecure Code Practices](#insecure-code-practices)

### Insecure Data Storage

Insecure data storage occurs when sensitive information, such as user credentials or personal information, is not securely stored. This might include storing data in plain text or using weak encryption methods. Such practices can lead to unauthorized access to sensitive data, resulting in data breaches, privacy violations, loss of user trust, and potential legal consequences.

**Issue Identified:** Initially, the app was using **AsyncStorage** to store sensitive data. Since **AsyncStorage** does not offer encryption, this exposed user information to potential security threats

**Solution Implemented:** To address this, we replaced **AsyncStorage** with **EncryptedStorage**. This changes ensures that all sensitive data is encrypted and securely stored, providing better protection against unauthorized access and significantly enhancing the app's overall security.
--

### Code Injection

Code injection happens when untrusted data is added to a program and run as if it were valid code. This vulnerability can allow attackers to change how the application behaves, access sensitive information, or even take control of the system. In this mobile app, this can lead to serious security issues, including compromised user data and the potential installation of malware.

**Issue Identified:** Initially, the app used the **eval()** function to evaluate user-input mathematical equations in the Note component. Due to **eval()**'s ability to run any JavaScript code, the application was vulnerable to code injection threats.

**Solution Implemented:** In order to solve this, we used a regular expression to do input validation, making sure that the equation only contains legitimate mathematical characters. We also used the **Function** constructor to replace **eval()** with a safer evaluation technique. With these modifications, the risk of code injection attacks is greatly reduced, as only valid mathematical expressions are allowed and the execution environment is safer.
--

## Importance of Security Measures

Implementing these security measures is crucial for safeguarding the app and its users:

**Secure Data Storage:**

- Protects sensitive information from unauthorized access and breaches
- Ensures compliance with data protection regulations and standards
- Enhance user trust and confidence in the application's security

**Code Injection:**

- Validating and sanitizing input prevents attackers from injecting and executing malicious code.
- Ensures the application functions as intended without being hijacked for malicious purposes.
- Enhances overall application security, reducing the risk of successful attacks

## Reflection and Lessons Learned

Through this security assessment, we learned the importance of implementing robust security practices:

**Secure Data Storage:**

- Avoid storing sensitive data in plain text or using hardcoded credentials
- Implement secure storage solutions for sensitive data, such as secure file storage systems or encrypted databases
- Ensure compliance with data protection standards and regulations to protect user privacy and data integrity

**Code Injection:**

- Never trust user input: it should always be verified and sanitized before processing or execution.
- Avoid risky function like eval().
- Implement thorough input validation and utilize safer alternatives for any necessary dynamic code execution.
