import React, { Component } from 'react';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: [],
            fileSelected: null
        };
        this.myStorage = window.localStorage;
    }

    fileSelectedHandler=()=>{
        let reader = new FileReader();


        reader.onload = (e)=>{

            let srcs = [...this.state.src]
            console.log(e.target)
            srcs.push(e.target.result)

            this.setState({
                src:srcs
            })

        }

        //save it to local storage

        this.myStorage.setItem('myPics', this.state.src.toString());

        if (this.fileInput.files[0]) {
            reader.readAsDataURL(this.fileInput.files[0]);
        }

    }

    uploadPictures(){
        let counter = 0
        return this.state.src.map((entry,key)=> {
            ++counter
            if (counter%5===0)
                return <span key={key}>
                            <br/>
                            <img key={key} className="App-impPrev" src={entry} alt="np pic"/>
                        </span>
            else
                return <img key={key} className="App-impPrev" src={entry} alt="np pic"/>
        } )
    }
    componentDidMount(){
        try{
            let items = this.myStorage.getItem('myPics')
            items = items.split(",")
            let arr = []
            for (let i = 0; i < items.length; i=i+2) {
                arr.push(items[i]+items[i+1])
            }
            console.log(arr)
        }catch (e) {
            console.log("No local storage")
        }

    }

    render() {
        return (
            <div>
                <input type='file' className="hidden" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput= fileInput}/>
                <img className="App-impPrev" src="./assets/demo_photo.png" alt="np pic" onClick={()=>this.fileInput.click()}/>
                {/*{this.state.src.map((entry,key)=> <img key={key} className="App-impPrev" src={entry} alt="np pic"/> )}*/}
                {this.uploadPictures()}
            </div>
        );
    }
}

export default App;
