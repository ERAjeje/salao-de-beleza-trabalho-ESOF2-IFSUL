import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3001/v1',
});

export default function connectionVerify(res) {
    if(res.status == 200){
        return true;
    }else{
        return false;
    }
}