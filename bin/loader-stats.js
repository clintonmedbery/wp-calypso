#!/usr/bin/env node
const path = require( 'path' );
const stats = require( path.join( __dirname, '..', 'server', 'bundler', 'assets.json' ) );

const whichSection = process.argv[2];

function getChunk( name ) {
	return stats.chunks.find( chunk => chunk.id === name );
}

const sectionChunk = getChunk( whichSection );
if ( ! sectionChunk ) {
	console.log( `no section chunk found for ${whichSection}` );
}


function getChunkAndSiblings( which ) {
	const mainChunk = getChunk( which );
	return [
		mainChunk,
		...mainChunk.siblings.map( getChunk )
	];
}


const chunksToLoad = [
	...getChunkAndSiblings( 'build' ),
	...getChunkAndSiblings( whichSection )
];

console.log( `to load ${whichSection}:` );

chunksToLoad.forEach( chunk => {
	console.log( `  ${chunk.id} (${chunk.size / 1000 }kb)`);
})

console.log( "Total: " + ( chunksToLoad.reduce( ( totalSize, chunk ) => totalSize + chunk.size, 0 ) / 1000 ) + "kb" );

