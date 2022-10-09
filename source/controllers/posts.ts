/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { nonsense } from './nonsenseDictionary'

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
// const dictionary = ['armadillo', 'beetroot', 'carnivore']


const getWord = async (req: Request, res: Response, next: NextFunction) => {
    const words = require('an-array-of-english-words')
    const dictionary = words.filter((d: string) => /fun/.test(d))
    let max = dictionary.length
    let i = getRandomInt(max)
    return res.status(200).json({
          randomWord: dictionary[i]
    });
};

const getDrSeussWord = async (req: Request, res: Response, next: NextFunction) => {
  const dictionary = nonsense
  let max = dictionary.length
  let i = getRandomInt(max)
    return res.status(200).json({
          randomWord: dictionary[i]
    });
}

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getWord, updatePost, deletePost, addPost, getDrSeussWord };