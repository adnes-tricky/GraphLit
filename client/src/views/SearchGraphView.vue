<template>
    <div class="search">
      <h1>Search</h1>
      <form ref="form" @submit.prevent="submitForm">
        <input type="text" name="searchword" id = "searchword" v-model="searchword" placeholder="Searchword" required/>
        <label>
            <input type="checkbox" name="category" id="category" v-model="category"/>
            Category
        </label>
        <label>
            <input type="checkbox" name="keyword" id="keyword" v-model="keyword" />
            Keyword
        </label>
        <br>
        <button type ="submit">Search</button>
        </form>
        <br>
        <button @click="showGraph = true,showTable = false">Link Graph</button><br>
        <button @click="showTable = true,showGraph = false">Search Results</button><br>
        <div v-if="showGraph">
            <h4>Graph View</h4>
            <network-graph :node-list="nodeList" :edge-list="edgeList"/>
        </div>
        <div v-if="showTable">
            <h4>Search Results</h4>
            <table>
            <thead>
                <tr>
                    <th>Search Word</th>
                    <th>Image Name</th>
                    <th>Created Date</th>
                    <th>Category</th>
                    <th>Keywords</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in resTable" :key="index">
                    <td>{{ item.searchword }}</td>    
                    <td>{{ item.imagename }}</td>
                    <td>{{ item.created_date }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.keywords }}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import NetworkGraph from '../components/NetworkGraphView.vue'

export default{
    name: 'searchWord',
    components: {
        NetworkGraph
    },
    data() {
        return{
            response: '',
            category: false,
            keyword: false,
            searchword: '',
            resTable: [],
            nodeList: {},
            edgeList: {},
            showGraph: false,
            showTable: false
        }
    },
    methods: {
            async submitForm(){
                var res=[]
                this.nodeList={}
                this.edgeList={}
                this.resTable=[]
                await axios.post('api/searchGraphKeyword',{
                    searchword: this.searchword,
                    category:this.category,
                    keyword: this.keyword
                })
                .then(function(response){
                    if(response.status==200){
                    res=response.data; //copy list of records from backend to global variable
                    }
                })
                .catch(error =>{
                    console.log(error);
                })  
                // Reset form fields
                this.searchword = '';
                this.category = false;
                this.keyword = false;
                this.$refs.form.reset();
                // clear the input values for the form data fields
                this.resTable=this.resTable.concat(res)
                this.showTable=true;
                const nodes = {};
                const edges = {};
                console.log(this.resTable)
                this.resTable.forEach((item, index) => {
                // Create a new node if it doesn't already exist
                if (!nodes[item.imagename]) {
                    nodes[item.imagename] = { name: item.imagename, type: "image", color:"#ff0000" };
                }
                
                if (!nodes[item.searchword]) {
                    nodes[item.searchword] = { name: item.searchword, type: "linkword", color: "#4466cc" };
                }

                // Create a new edge if it doesn't already exist
                const source = item.searchword;
                const target = item.imagename;
                const edgeId = `edge${index + 1}`;

                if (!edges[edgeId]) {
                    edges[edgeId] = { source, target };
                }
                });

                // Update state with new node and edge lists
                this.nodeList = nodes;
                this.edgeList = edges;
            }
        }
}
</script>
  