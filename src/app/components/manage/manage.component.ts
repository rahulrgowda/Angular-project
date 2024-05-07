import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
  constructor( private router: Router, private bikeSrv: BikeService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private nav:NavbarService) {

    this.activatedRoute.params.subscribe((res) => {
      this.locationId = res.locationId;
    })
  }

  ngOnInit() {
    this.nav.show()
    this.getAllBikes();
    this.getAllLocations();
  }

  bikeObj = this.fb.group({
    brand: ['', [Validators.required]],
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    locationId: [''],
    locationTitle: ['', [Validators.required]],
    price: ['', [Validators.required]]
  }) 
  locations: any[] = [];
  ourBikes: any[];
  locationId: any;
  editedBike: any;

  getAllLocations() {
    this.bikeSrv.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    })
  }

  getAllBikes() {
    this.bikeSrv.getAllBikes().subscribe((res: any) => {
      this.ourBikes = res.filter(bike => {
        return this.locationId == bike.locationId
      });
    })
  }

  onAdd() {
    this.bikeObj.controls['locationId'].setValue(this.locationId);
    const newBike = this.bikeObj.value;
    this.bikeSrv.addNewBike(newBike).subscribe((res: any) => {
      this.getAllBikes()
    })
    this.closeForm();
    this.bikeObj.reset();
  }

  deleteBike(id: any) { 
    if(confirm("Are you sure you wan't to delete bike"))
    this.bikeSrv.deleteBike(id).subscribe((res: any) => {
      this.getAllBikes()
    });    
  }

  getEditBike(bike: any) {
    document.getElementById('modal-title').innerHTML = 'Edit Bike';
    document.getElementById('modal-btn-add').style.display = 'none';
    document.getElementById('modal-btn-edit').style.display = 'block';
    this.openForm();
    
    
    this.bikeObj.patchValue({
      brand: bike.brand,
      name: bike.name,
      imageUrl: bike.imageUrl,
      locationTitle: bike.locationTitle,
      price: bike.price
    });
    
    this.editedBike = this.bikeObj.value;
    this.editedBike.locationId = this.locationId;
    this.editedBike._id = bike._id;
  }

  editBike() {
    this.editedBike.price = this.bikeObj.value.price;
    this.editedBike.locationTitle = this.bikeObj.value.locationTitle;
    if (this.editedBike) {
      this.bikeSrv.updateBike(this.editedBike).subscribe((res: any) => {
        this.getAllBikes();
      });
      this.closeForm();
      this.editedBike = null;
    }
  }


  openForm() {
    const modal = document.getElementById('addBikeModal');
    if (modal != null) {
      modal.style.display = 'block';
    }

  }

  closeForm() {
    const modal = document.getElementById('addBikeModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
    this.bikeObj.reset();
    document.getElementById('modal-btn-edit').style.display = 'none';
    document.getElementById('modal-title').innerHTML = 'Add Bike';
    document.getElementById('modal-btn-add').style.display = 'block';
  }

}
