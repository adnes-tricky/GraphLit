<template>
    <v-network-graph
      class="graph"
      :nodes="nodeList"
      :edges="edgeList"
      :node-style="getNodeStyle"
    />
  </template>
  
  <script>
  import { VNetworkGraph } from 'v-network-graph'
  
  export default {
    components: {
      VNetworkGraph
    },
    props: {
      nodeList: {
        type: Object,
        required: true
      },
      edgeList: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        nodes: this.nodeList,
        edges: this.edgeList
      }
    },
    methods: {
      getNodeStyle(node) {
        console.log(node.color)
        return {
          'background-color': node.color,
        };
      },
    },
  }
  </script>
  
  <style>
  .graph {
    width: 80vw;
    height: 60vh;
    border: 1px solid #fff;
    background-color: #8bbdd9;
  }
  </style>
  