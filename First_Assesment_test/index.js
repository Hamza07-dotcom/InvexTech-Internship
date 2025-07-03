// Write a function that takes a string and returns it reversed
 
let reverse=(str)=>str.split("").reverse().join("");

console.log(reverse("hello"));

// Create a function to count the number of vowels (a, e, i, o, u) in a given string.
function countVowels(str){
let vowels="aeiouAEIOU";
let count=0;
for(char of str){
    if(vowels.includes(char)){
         count++;
    }
}
return count;

};
console.log(countVowels("hamza"));

// Write a function to calculate the sum of only positive numbers in an array.



function sumPositive(arr){


let total=0;

for (i=0;i<arr.length;i++){

const num=arr[i];

if(num>0){
total=total+num;

}
}
return total;

}
let array1=[1,2,3,4];
let sum=sumPositive(array1);
console.log(sum);


// Create a function that filters only odd or only even numbers based on a second argument.
let array=[2,3,4,5,6];
function EvenNumbers(arr)
{
let even=    arr.filter(n=>n%2==0);
return even;
}

console.log(EvenNumbers(array));
let array2=[1,2,3,4];
// also similiar for odd numbers 
function oddFinder(arr){

    let odd=arr.filter(n=>n%2===1);
    return odd;

}
// console.log(oddFinder(array2));
// Write a function that flattens an array with one level of nesting.

// flatten([1, [2, 3], [4, 5], 6]) ➞ [1, 2, 3, 4, 5, 6]

function flatteneddArray(arr){
let flattenedArray=[];

arr.forEach(element=>{

if (Array.isArray(element)){

    element.forEach(nestedElement=>{
        flattenedArray.push(nestedElement);
    });
}
else{
    flattenedArray.push(element);
}
});



return flattenedArray;


}

let flatten=([1, [2, 3], [4, 5], 6]);
console.log(flatteneddArray(flatten));


// Write a function that removes duplicate values from an array.

let arr3=[1,2,3,4,5,5,5,3,4,2];

function duplication(arr){

    return arr.reduce((accum,current)=>{

        if(!accum.includes(current)){
            accum.push(current);
         } 
             return accum;
    } ,[]);
}

console.log(duplication(arr3));


// Write a function that returns the longest word from a sentence.

function longest(str){
let reduced=str.reduce((longest,current)=>current.length>longest.length?current:longest);

    return reduced;
}

let arr=["hamza","nomi"];
console.log(longest(arr));

// Write a function to find elements that exist in both arrays.

// commonElements([1, 2, 3], [2, 3, 4]) ➞ [2, 3]

function common2(arr1,arr2){
return arr1.reduce((commonElements,currentElement)=>{
    if (arr2.includes(currentElement)&&!commonElements.includes(currentElement))
    {
        commonElements.push(currentElement);
    
}
return commonElements;

},[]);
}

let arr1=[1,2,3,4,5];
let arr2=[3,4,5,6];

console.log(common2(arr1,arr2));


// Todo List  App using Es6 script 
let list=[];

function add(task){
task.push({task,done:false});
console.log("task Added");


}

function remove(index){


if(index<1||index>list.length){

    console.log("Your Input is invalid");
    
}

else{

list.splice(index-1,1);
console.log(list);


}

}


function complete(index){


list[index-1].done=true;
console.log(list);


}


function filtertask(){

    console.log(list.filter(item=>item.done===true));

    
}

function view_list(){

list.map((item,index)=>{

    console.log(`${index+1}: ${item.task}${item.done}`);
    
})

}
