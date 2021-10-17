import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {ReviewService, AuthenticationService, AlertService } from '@/_services';
import { User } from '../_models';
import { Reviews } from '../_models';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component ({templateUrl: 'bookreview.component.html'})
    
    export class BookReviewComponent implements OnInit{
        userForm : FormGroup;
        listData : any;
        currentUser: User;
        reviews: Reviews[];
         isShown: boolean = false ;
         submitted = false;
        loading = false;

        constructor
          (  private fb:FormBuilder,
            private route: ActivatedRoute,
            private router: Router,
            private authenticationService: AuthenticationService,
            private reviewService: ReviewService) 

            {
                this.currentUser= this.authenticationService.currentUserValue;
            }
                        
            
        ngOnInit() 
               
            { 
                this.listData = [];
            this.userForm = this.fb.group ({
                bookname : ['', Validators.required],
                authorname : ['',Validators.required],
                review :['',Validators.required]
            });
            
        
            this.loadAllReviews();

            }

             private loadAllReviews() {
                console.log('get');
             this.reviewService.getAll()
                 .pipe(first())
                 .subscribe(reviews => this.reviews = reviews)
                 console.log(this.reviews);;
                 
         }
            
            // convenience getter for easy access to form fields
         get f() { return this.userForm.controls; }

         addItem() {
            this.submitted = true;
    
            this.loading = true;
            this.reviewService.add(this.userForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        console.log('addition successful');
                        this.router.navigate(['/bookreview']);
                        this.userForm.reset();
                        this.loadAllReviews();
                    },
                );
                    }

                    close() {
                        this.router.navigate(['http://localhost:8080/']);
                    }
       

        reset() {
            this.userForm.reset();
            this.isShown=false;
        }

         toggleShow() {
            this.isShown = ! this.isShown;
           
             }
        removeItem(element) {
            console.log('remove');
            this.listData.forEach((value,index)=> {
                if (value == element)
                this.listData.splice(index,1);
                
            });
        }
      
    }