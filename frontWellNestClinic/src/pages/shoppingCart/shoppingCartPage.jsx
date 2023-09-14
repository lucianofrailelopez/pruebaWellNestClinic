import style from "../pharmacy/pharmacyPage.module.css";
import BackGroundGlobal from '../../components/Pharmacy/pharmacyComp'
import ShoppingCartComp from '../../components/shoppingCart/ShoppingCartComp'


function shoppingCartPage(){
  return (<div className={style.farmacia}>
    <BackGroundGlobal imgBackGround="https://i.pinimg.com/474x/f6/46/81/f64681ae17370c0c383b19a7f74e1f98.jpg"></BackGroundGlobal>
    <ShoppingCartComp/>
  </div>)
}

export default shoppingCartPage;