import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9080/users";

class UserService {

    gettasks(){
        return axios.get(USER_API_BASE_URL);
    }

    createtask(task){
        return axios.post(USER_API_BASE_URL, task);
    }

    gettaskBysno(tasksno){
        return axios.get(USER_API_BASE_URL + '/' + tasksno);
    }

    updatetask(task, tasksno){
        return axios.put(USER_API_BASE_URL + '/' + tasksno, task);
    }

    deletetask(tasksno){
        return axios.delete(USER_API_BASE_URL + '/' + tasksno);
    }
}

export default new UserService()