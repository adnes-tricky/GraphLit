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
  max-width: 95%;
  height: 85vh;
  border: 1px solid #fff;
  margin: auto;
  background-color: rgb(60, 42, 88);
}

  </style>
  