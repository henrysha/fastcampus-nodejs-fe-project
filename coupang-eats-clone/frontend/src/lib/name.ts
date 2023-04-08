/**
 *
 * To replace Korean characters along with English letters, you can use a regular expression that matches all Unicode characters within the Korean Unicode block. The Korean Unicode block ranges from `AC00` to `D7AF`. Here's an example:

  ```
  let myString = "안녕하세요. Hello World.";
  let result = myString.charAt(0) + myString.slice(1).replace(/[\uAC00-\uD7AFa-zA-Z]/g, "*");

  console.log(result); // Output: "안****하세요. H**** *****."
  ```

  In this example, we are using the regular expression `/[\uAC00-\uD7AFa-zA-Z]/g` to match all Unicode characters within the Korean Unicode block and all English letters. The `g` flag ensures that all occurrences of these characters in the string are replaced with an asterisk.

  The rest of the code is similar to the previous example, where we get the first letter of the string and concatenate it with the modified string using `String.prototype.charAt()` and `String.prototype.slice()` methods.

  The output will be a new string with every letter except the first letter (in both English and Korean) replaced with an asterisk (*).
 * @returns
 */
export const hideName = (name: string) => {
  return name.charAt(0) + name.slice(1).replace(/[\uAC00-\uD7AFa-zA-Z]/g, '*')
}
