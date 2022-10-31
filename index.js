#!/usr/bin/env node
import {build} from './engine.js'

if(process.argv.includes('--build'))
{
    build()
}