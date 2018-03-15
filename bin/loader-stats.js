#!/usr/bin/env node
const path = require( 'path' );
const stats = require( path.join( __dirname, '..', 'server', 'bundler', 'assets.json' ) );

const whichSection = process.argv[2];


const sectionChunk = stats.chunks.find( chunk => chunk.id === whichSection );
if ( ! sectionChunk ) {
	console.log( `no section chunk found for ${whichSection}` );
}

console.log( `stats for ${whichSection}` );

console.log( `  size: \n    ${ sectionChunk.size }` );
console.log( "  files: " );
sectionChunk.files.forEach( file => {
	console.log( `    ${file}`)
} );
console.log( "  siblings: " );
sectionChunk.siblings.forEach( sibling => {
	console.log( `    ${sibling}`)
} );
