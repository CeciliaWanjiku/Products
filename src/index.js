import React from 'react';
import { render } from 'react-dom';
import ProductForm from './productForm';
import ModalExample from './example';
import { Table, Button } from 'reactstrap';

let array = ["shoe", "bags", "mascara"]
let id = 0
let cost = null

const makeProduct = (name = 'shoe') => ({
  name: name,
  id: ++id,
  description: `${name} ${id}`,
  cost: cost
})

class Example extends React.Component {
  constructor(props) {
    super(props);
    console.log('heheh', props);

    this.state = {
      products: array.map(makeProduct),
      newProduct: {},
      editedProduct: {},
      totalCost: null,
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }
    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

	
  addProduct = () => {
    if (!this.state.newProduct.name){
      return;
    }
    this.setState(prevState =>{
      console.log('prevstate',prevState)
      return ({
        products: prevState.products.concat(prevState.newProduct),
        newProduct: {}
        })
    })
  }

  onEditProduct = (productId) => {
    const productToEdit = this.state.products.find(product => product.id === productId)
    this.setState(() => ({
      editedProduct: productToEdit
    }))

  } 
  
  editProduct = () => {
    this.setState(prevState => ({
      editedProduct: {},
      products: prevState.products.map(product => {
        if (product.id === prevState.editedProduct.id) {
          return prevState.editedProduct;
        }

        return product;
      })
    }))
  }
  totalCost = () => {
    return this.state.products.reduce((a,b) => {
      console.log('a', a, 'b', b)
      return b.cost ? parseInt(a, 10) + parseInt(b.cost, 10) : a;

    }, 0)
  }

  editProductSlice = () => {
    this.setState(prevState => {
      const {editedProduct, products} = prevState;
      const indexOfEditedProduct = products.findIndex(product => editedProduct.id === product.id)
  
      return {
        editedProduct: {},
        products: [
          ...products.slice(0, indexOfEditedProduct),
          editedProduct,
          ...products.slice(indexOfEditedProduct + 1)
        ]
      }
    })
  }
  onChange = ({target: {name, value}}) => {
    const isEditing = typeof this.state.editedProduct.id !== 'undefined';
    const regex = /^\d+$/;
    if (name === 'cost' && value && !regex.test(value)) {
      return;
    }

    this.setState((prevState) => {
      let keyName;
      let productId;
  
      if (isEditing) {
        keyName = 'editedProduct';
        productId = prevState[keyName].id
      } else {
        keyName = 'newProduct';
        productId = ++id;
      }

      return {
        [keyName]: {
          ...prevState[keyName],
          id: productId,
          [name]: value
        }
      }
    })
  }

  render() {
    console.log('nnnn', this.state.modal)
    const isEditing = typeof this.state.editedProduct.id !== 'undefined';
    const product = isEditing ? this.state.editedProduct : this.state.newProduct;
    const modal = this.state.modal
    const className = this.props.className
    const props = { product, onChange: this.onChange,className, isEditing, modal, editProduct: this.editProductSlice, addProduct: this.addProduct, toggle: this.toggle }

    return (
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th> Cost </th>
            <th />
          </tr>
        </thead>
        <tbody>
        {this.state.products.map(product=> (
          <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.cost} </td>
            <td><Button onClick={() => this.onEditProduct(product.id)}>Edit</Button></td>
          </tr>
          ))}

          <tr>
           <td> <ProductForm {...props} /></td>
           <td> <ModalExample /> </td>
           <td>{this.totalCost()}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <Example name="CodeSandbox" />
  </div>
);

render(<App />, document.getElementById('root'));
