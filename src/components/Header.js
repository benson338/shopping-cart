import {
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  Badge,
  Button,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState, FilterState } from '../contexts/Context';

function Header() {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const { filterDispatch } = FilterState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) =>
              filterDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align={'end'}>
            <Dropdown.Toggle>
              <FaShoppingCart color="white" size="25px" />
              {/* This attributes are react-icons specific(read docs) & doesn't work on regular JSX elements */}
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>
            {/* <Dropdown.Menu style={{ minWidth: 370 }}> */}
            {cart.length > 0 ? (
              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.map((prod) => (
                  <span className="cartItem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split('.')[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: prod,
                        })
                      }
                    />
                  </span>
                ))}
                <Dropdown.Item as="div" style={{ all: 'unset' }}>
                  {/* for functionality & removing style & anchor tag */}
                  <Link to="/cart">
                    <Button style={{ width: '95%', margin: '5px 10px' }}>
                      Go To Cart
                    </Button>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              </Dropdown.Menu>
            )}
            {/* </Dropdown.Menu> */}
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
