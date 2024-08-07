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

---

### Improper Authentication

Improper authentication occurs when an application fails to properly authenticate a user's identity. This can include things like keeping user credentials in plain text, utilizing insecure or obsolete authentication systems, or failing to adopt precautions to prevent brute-force assaults. These flaws can allow unauthorized access to the application, compromising of user data, and potentially serious security breaches.

**Issue Identified:** Initially, the software used plain text storage for passwords and hardcoded user credentials, posing severe security issues. Storing passwords in plain text is a significant risk since it allows attackers who obtain access to the storage to simply retrieve user passwords. Furthermore, the usage of hardcoded credentials can lead to unlawful access if they are detected.

**Solution Implemented:**

- Password Hashing and Salting: Passwords are now hashed using SHA-256 combined with a unique salt for each user, ensuring secure storage.
- Secure Salt Generation: Used **react-native-randombytes** to generate unique salts, enhancing password security.
- Secure Password Verification: During login, the entered password is hashed with the stored salt and compared with the stored hashed password to verify the user's identity.

---

### Code Injection

Code injection happens when untrusted data is added to a program and run as if it were valid code. This vulnerability can allow attackers to change how the application behaves, access sensitive information, or even take control of the system. In this mobile app, this can lead to serious security issues, including compromised user data and the potential installation of malware.

**Issue Identified:** Initially, the app used the **eval()** function to evaluate user-input mathematical equations in the Note component. Due to **eval()**'s ability to run any JavaScript code, the application was vulnerable to code injection threats.

**Solution Implemented:** In order to solve this, we used a regular expression to do input validation, making sure that the equation only contains legitimate mathematical characters. We also used the **evaluate** from mathjs to replace **eval()** with a safer evaluation technique. With these modifications, the risk of code injection attacks is greatly reduced, as only valid mathematical expressions are allowed and the execution environment is safer.

---

### Insufficient input validation

Insufficient input validation occurs when user input is not properly checked or sanitized, potentially leading to various vulnerabilities and incorrect application behavior. This can expose applications to security risks and affect functionality.

**Issue Identified:** Initially, the app did not thoroughly validate user inputs such as usernames and passwords. This lack of validation could lead to improper handling of data and security risks, and user credentials were not adequately secured, leading to potential exposure of sensitive information.

**Solution Implemented:**

- Input Validation in **login.tsx**: We implemented robust validation to ensure that user inputs meet the required format and criteria before processing. This helps prevent invalid data from entering the system and ensures data integrity.
- Hashing in **notes.tsx**: We used SHA-256 hashing to securely manage user credentials. Specifically, the hashed password was compared to the stored hashed value, which enhances security by ensuring that plain text passwords are not used directly. This process involves securely hashing the user's password and using this hashed value for comparisons and storage.

---

## Importance of Security Measures

Implementing these security measures is crucial for safeguarding the app and its users:

**Secure Data Storage:**

- Protects sensitive information from unauthorized access and breaches
- Ensures compliance with data protection regulations and standards
- Enhance user trust and confidence in the application's security

**Improper Authentication:**

- Ensures that only authorized users have access to the program, safeguarding user data and resources.
- Ensures that the application works as intended without being hijacked for nefarious reasons.
- Improves overall application security by lowering the risk of successful assaults.

**Code Injection:**

- Validating and sanitizing input prevents attackers from injecting and executing malicious code.
- Ensures the application functions as intended without being hijacked for malicious purposes.
- Enhances overall application security, reducing the risk of successful attacks

**Insufficient input validation:**

- Ensures that user inputs are properly checked and sanitized to prevent injection attacks and data corruption.
- Reduces the risk of application instability and security breaches by rejecting invalid or malicious data.
- Enhances overall application security and compliance with data protection standards.

## Reflection and Lessons Learned

Through this security assessment, we learned the importance of implementing robust security practices:

**Secure Data Storage:**

- Avoid storing sensitive data in plain text or using hardcoded credentials
- Implement secure storage solutions for sensitive data, such as secure file storage systems or encrypted databases
- Ensure compliance with data protection standards and regulations to protect user privacy and data integrity

**Improper Authentication:**

- Passwords should not be stored in plain text or used as hardcoded credentials.
- Implement safe password storage by hashing passwords using a strong algorithm and unique salts.
- Use safe mechanisms for salt generation, and guarantee that passwords are securely checked during authentication.
- Increase user trust and security by implementing effective authentication procedures, lowering the risk of illegal access.

**Code Injection:**

- Never trust user input: it should always be verified and sanitized before processing or execution.
- Avoid risky function like eval().
- Implement thorough input validation and utilize safer alternatives for any necessary dynamic code execution.

**Insufficient input validation:**

- Always validate and sanitize user inputs to prevent invalid data and potential security threats.
- Implement strict validation rules for all input fields to ensure only correct and expected data is accepted.
- Regularly update validation mechanisms to address new security vulnerabilities and enhance overall application security.
- 

## Secure Coding Practices

As part of the project, we implemented several enhancements to ensure secure handling of sensitive data and improve overall application security. This involved addressing common insecure coding practices and implementing the following improvements:

### 1. Secure Storage

- **Implemented secure storage for API keys using `react-native-keychain`:**
  - Sensitive data such as API keys are securely stored and retrieved using secure storage mechanisms.
  - This prevents sensitive information from being exposed in the codebase.

### 2. Input Validation

- **Added input validation for user inputs:**
  - A utility function `validateInput` was created to sanitize inputs by removing special characters.
  - Ensures that all user-provided data is validated before processing to prevent injection attacks.

### 3. Error Handling

- **Improved error handling mechanisms:**
  - Implemented try-catch blocks for network requests and critical operations.
  - Errors are logged and handled gracefully, preventing information leakage.

### 4. Access Control

- **Enforced role-based access control for sensitive operations:**
  - Ensured that only authorized users can perform sensitive actions.
  - Role checks are in place to verify user permissions before executing restricted functions.

### 5. Dependency Management

- **Regularly audited project dependencies:**
  - Utilized `npm audit` to identify and address vulnerabilities in third-party packages.
  - Ensured that all dependencies are up to date and secure.

### How to Test Your Part

1. **Verify Secure Storage**:
   - Test the storing and retrieval of API keys using the implemented functions to ensure they operate securely.

2. **Test Input Validation**:
   - Validate that user inputs are correctly sanitized and invalid inputs are handled gracefully.

3. **Check Error Handling**:
   - Simulate errors in network requests and verify that they are logged and managed without exposing sensitive information.

4. **Assess Access Control**:
   - Attempt restricted actions with different user roles to confirm that access control mechanisms are effective.

5. **Review Dependencies**:
   - Run `npm audit` and check for any outstanding vulnerabilities in the dependencies.

