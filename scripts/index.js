//block definitions
Blockly.defineBlocksWithJsonArray([
  {
    type: "rotate",
    message0: "rotate %1 by %2",
    args0: [
      {
        type: "field_dropdown",
        name: "direction",
        options: [
          ["right", "right"],
          ["left", "left"],
        ],
      },
      {
        type: "field_angle",
        name: "rotate",
        angle: 45,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },
  {
    kind: "block",
    type: "moveahead",
    message0: "Move ahead in this direction",
    args0:[],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
  {
    type:"for_loop",
    kind:"block",
    message0:"repeat %1 times %2 do this %3",
    args0:[
      {
        type:"field_input",
        name:"n",
        text:"4",
      },
      {
        type:"input_dummy",
      },
      {
        type:"input_statement",
        name:"statements",
      }
    ],
    previousStatement:null,
    nextStatement:null,
    colour:20,
    
  },
  {
    kind:"block",
    type:"clear_canvas",
    message0:"clear canvas",
    args0:[],
    previousStatement:null,
    nextStatement:null,
    colour:65,
  }
]);

//loading toolbox
const toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "for_loop",
    },
    {
      kind: "block",
      type: "rotate",
    },
    {
      kind: "block",
      type: "moveahead",
    },
    {
      kind:"block",
      type:"clear_canvas",
    }
  ],
};

//injecting toolbox in workspace
Blockly.inject("workspace", {
  toolbox: toolbox,
  scrollbars: false,
});


const draw = new Draw();

//Dynamic blocks
Blockly.JavaScript['moveahead'] = function (block) {
  return "draw.drawline();";
};
Blockly.JavaScript['rotate'] = function(block){
  if(block.getFieldValue('direction') == "right")
  {
    return "draw.rotate(-" + block.getFieldValue('rotate')+");";
  }
  else return "draw.rotate(" + block.getFieldValue('rotate')+");";
  
}
Blockly.JavaScript['for_loop'] = function(block){
  return "for(let i =0;i<" + block.getFieldValue('n') +";i++){" + Blockly.JavaScript.statementToCode(block,'statements') + "};";
}
Blockly.JavaScript['clear_canvas'] = function(block){
  return "draw.clearcanvas();";
}

//generate code
const getcode = () => {
  let code = Blockly.JavaScript.workspaceToCode(
    Blockly.common.getMainWorkspace()
  );
try{
  eval(code);
}
catch{console.log(error);};
  
};
