import { AddTextNote } from "./dynamic-cmps/add-text-note.jsx"
import { AddImageNote } from "./dynamic-cmps/add-image-note.jsx"

export class AddNote extends React.Component {
    state = {
        type: 'text'
    }

    componentDidMount() {
        
    }

 

    onChangeInput = (type) => {
        this.setState({type})
    }

    render() {
        const {type} = this.state

        return <section className="add-note">

            <DynamicCmp type={type}/>


            

            <div className="option-container">
                <div>
                    <img src="../assets/img/keep/text.png" onClick={()=>this.onChangeInput('text')} /></div>
                <div>
                    <img src="../assets/img/keep/image.png" onClick={()=>this.onChangeInput('image')} alt="" />
                </div>
                <div>
                    <img src="../assets/img/keep/video.png" alt="" /></div>
                <div>
                    <img src="../assets/img/keep/todo.png" alt="" />
                </div>
            </div>
        </section>
    }

}



function DynamicCmp(props) {
    switch (props.type) {
        case 'text':
            return <AddTextNote {...props} />
        case 'image':
            return <AddImageNote {...props} />
    }
}
