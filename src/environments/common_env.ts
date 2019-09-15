/**
 * @description the common environment variables between dev and prot
 */
import dotEnv from 'dotenv';

const CommonEnv = {
    testEnv: 'test',
    lookupKey:{
        getAllRecords: '1d963791-5450-4275-a614-7349b54df552',
        postContact: '33183092-929b-44b4-9d7e-d2a8b3a98ead',
        deleteContact: '2033695f-12c5-477c-9be0-30319f3242ea'
      }
}

export { CommonEnv }