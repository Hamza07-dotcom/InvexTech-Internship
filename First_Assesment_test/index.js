// Write a function that takes a string and returns it reversed
 
// let reverse=(str)=>str.split("").reverse().join("");

// console.log(reverse("hello"));

// // Create a function to count the number of vowels (a, e, i, o, u) in a given string.
// function countVowels(str){
// let vowels="aeiouAEIOU";
// let count=0;
// for(char of str){
//     if(vowels.includes(char)){
//          count++;
//     }
// }
// return count;

// };
// console.log(countVowels("hamza"));

// Write a function to calculate the sum of only positive numbers in an array.



// function sumPositive(arr){


// let total=0;

// for (i=0;i<arr.length;i++){

// const num=arr[i];

// if(num>0){
// total=total+num;

// }
// }
// return total;

// }
// let array=[1,2,3,4];
// let sum=sumPositive(array);
// console.log(sum);


// Create a function that filters only odd or only even numbers based on a second argument.
// let array=[2,3,4,5,6];
// function EvenNumbers(arr)
// {
// let even=    arr.filter(n=>n%2==0);
// return even;
// }

// console.log(EvenNumbers(array));
// let array1=[1,2,3,4];
// // also similiar for odd numbers 
// function oddFinder(arr){

//     let odd=arr.filter(n=>n%2===1);
//     return odd;

// }
// console.log(oddFinder(array1));
// Write a function that flattens an array with one level of nesting.

// flatten([1, [2, 3], [4, 5], 6]) ➞ [1, 2, 3, 4, 5, 6]

// function flatteneddArray(arr){
// let flattenedArray=[];

// arr.forEach(element=>{

// if (Array.isArray(element)){

//     element.forEach(nestedElement=>{
//         flattenedArray.push(nestedElement);
//     });
// }
// else{
//     flattenedArray.push(element);
// }
// });



// return flattenedArray;


// }

// let flatten=([1, [2, 3], [4, 5], 6]);
// console.log(flatteneddArray(flatten));


// Write a function that removes duplicate values from an array.

// let arr=[1,2,3,4,5,5,5,3,4,2];

// function duplication(arr){

//     return arr.reduce((accum,current)=>{

//         if(!accum.includes(current)){
//             accum.push(current);
//          } 
//              return accum;
//     } ,[]);
// }

// console.log(duplication(arr));






// Write a function that returns the longest word from a sentence.

// function longest(str){
// let reduced=str.reduce((longest,current)=>current.length>longest.length?current:longest);

//     return reduced;
// }



// let arr=["hamza","nomi"];
// console.log(longest(arr));



function long(str){

if (typeof str!=='string'||str.length===0)
{
    return {Char:"",length:0};
}



let longestChar=[0];
let maxLength=1;
let currentChar=str[0];
let currentLength=1;


for(let i=1; i<str.length;i++){

    if(str[i]===currentChar){
        currentLength++;
    }
    else{
        currentChar=str[i];
        currentLength=1;
    }

    if (currentLength>maxLength){

        maxLength=currentLength;
        longestChar=currentChar;
    }
}
return {Char:longestChar,length:maxLength};
}

let str="I am hamza Tariq";
console.log(long(str));








// Write a function to find elements that exist in both arrays.

// commonElements([1, 2, 3], [2, 3, 4]) ➞ [2, 3]

//  function commonElements(arr1,arr2){

// let common=arr1,arr2.filter((n,n)=>n==n;);



// }