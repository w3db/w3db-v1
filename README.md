# DW3 - DECENTRALIZED DATABASE

DB3 is a decentralised database uses IPFS for managing data 


## Usage

go to dw3 official page and create app for your project

install this package in your project directory

```
   # Yarn

   $ yarn add dw3

```

   OR


``` 
  # npm

  $ npm i dw3

```   


## Creating DW3 Instance 

   ``` javascript
       const { DW3 } = require("dw3")

       const config = {
          address : // Your Wallet address
          appId   : // Your appID 
          secretString: // Your app secret string
          url     : // Your application url or localhost url for development mode
       }

       const dw3 = new DW3(config);

        
   ```

## ADDING NEW DOCUMENT 

   ``` javascript
   // adding new collection
   
   const userCollection = dw3.Collection("Users");

   //

  const isSuccess = await userCollection.addDoc({ _id: "1233434854323485",firstName: "JOHN", lastName: "DOE" });


   ```


## GET A PARTICULAR DOCUMENT 

   ``` javascript

     const doc =  await userCollection.getDoc({ _id: "1233434854323485" });

   
   ```


## UPDATING A PARTICULAR DOCUMENT 

   ``` javascript

    const isSuccess =  await userCollection.updateDoc({ _id: "1233434854323485" },{ lastName: "WICK" });

   
   ```


## DELETING A PARTICULAR DOCUMENT 

   ``` javascript

    const isSuccess =  await userCollection.deleteDoc({ _id: "1233434854323485" });

   
   ```


## DELETING A COLLECTION 

   ``` javascript

     const isSuccess = await userCollection.delete()

   
   ```

