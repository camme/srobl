# Swedish Robot Language (srobl)

This is just a try at writing a pegjs grammar to create a simple languge understandable by children to program a robot

Use it with [peg](http://pegjs.org/) as the parser. 

The interpreter will be added soon and will communicate through [johnny-five](https://github.com/rwaldron/johnny-five)

## Example

This is what you should be able to write to control the robot

    åk fram 10 steg
    snurra till höger 2 steg
    tänd lampa 1
    vänta 10 sekund
    åk bak 1 steg
