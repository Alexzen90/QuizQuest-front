import { http } from "../../Infrastructure/Http/axios.instance"

export class UserService {
  static getUsers = async () => {
    try {
      const response = await http.post('/login', { username: 'John', password: '1234' })
      return response.data.results
    } catch (e) {
      console.log(e)
    }
  }
}