import Card from "antd/lib/card/Card";
import { Button } from "antd";
import "./Users.css";
import { Link } from "react-router-dom";

const User = (props) => {

    const handleClick = () => {
        props.setUser(props.user, props.user.id);
    }
    return (
        <Card title={props.user.name} className="user">
            <Button className="user_button" onClick={handleClick}><Link to={`/user/${props.user.id}`}>Know more</Link></Button>
        </Card>
    );
}

export default User;