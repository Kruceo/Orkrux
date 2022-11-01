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