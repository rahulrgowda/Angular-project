import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  // register

  registerUser(obj: any) {
    return this.http.post('http://localhost:8000/AddNewUser', obj)
  }

  getUser(obj:any) {
    return this.http.post('http://localhost:8000/GetUser',obj)
  }

  getAllRegister() {
    return this.http.get('http://localhost:8000/GetUsers')
  }

  //Bikes

  addNewBike(obj: any) {
    return this.http.post('http://localhost:8000/AddNewBike', obj)
  }

  getAllBikes() {
    return this.http.get('http://localhost:8000/GetBikes')
  }

  deleteBike(id: any) {
    return this.http.delete('http://localhost:8000/DeleteBike', { body: { _id: id } })
  }

  updateBike(obj: any) {
    return this.http.put('http://localhost:8000/UpdateBike', obj);
  }

  //Locations

  getAllLocations() {
    return this.http.get('http://localhost:8000/GetAllLocations')
  }

  //Booking Details

  sendBookingDetails(obj: any) {
    return this.http.post('http://localhost:8000/AddBookingDetail', obj)
  }

  getAllBookings() {
    return this.http.get('http://localhost:8000/GetBookings')
  }

  //Feedbacks

  sendFeedback(obj: any) {
    return this.http.post('http://localhost:8000/AddFeedback', obj)
  }

  getAllFeedbacks() {
    return this.http.get('http://localhost:8000/GetFeedbacks')
  }

  deleteFeedback(id: any) {
    return this.http.delete('http://localhost:8000/DeleteFeedback', { body: { _id: id } })
  }
}
