#!/usr/bin/env node

import {build} from './engine.js'
import create from './create.js'

if(process.argv.includes('--build'))
{
    build()
}
if(process.argv.includes('--create'))
{
    create()
}
console.log('\n--create  =>  Create the template for your app into the located folder.\n--build  =>  Build your project to "out" folder.')