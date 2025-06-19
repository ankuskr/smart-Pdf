import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PredictedAgeResponse } from 'src/app/models/user.model';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  countries = ['United States', 'India', 'Canada'];
  states: string[] = [];
  cities: string[] = [];
  predictedAge: number | null = null;
  signaturePreview: string | null = null;
  signatureRequired = false;
  isLoading = false;

  @ViewChild('signatureInput') signatureInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupNameChangeListener();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      conformpassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
      addressLine2: ['', [Validators.maxLength(100)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,6}$/)],
      ],
      occupation: ['', [Validators.required]],
      annualIncome: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]],
      signature: ['', Validators.required],
    });
  }

  setupNameChangeListener(): void {
    this.userForm.get('fullName')?.valueChanges.subscribe((name) => {
      if (name && name.length > 1) {
        this.fetchPredictedAge(name);
      } else {
        this.predictedAge = null;
      }
    });
  }

  fetchPredictedAge(name: string): void {
    this.userService.getPredictedAge(name).subscribe({
      next: (res) => {
        this.predictedAge = res.age;
      },
      error: () => {
        this.predictedAge = null;
      },
    });
  }

  onCountryChange(): void {
    const selectedCountry = this.userForm.get('country')?.value;
    this.states = this.locationService.getStates(selectedCountry);
    this.cities = [];
    this.userForm.patchValue({ state: '', city: '' });
  }

  onStateChange(): void {
    const selectedCountry = this.userForm.get('country')?.value;
    const selectedState = this.userForm.get('state')?.value;
    // this.cities = this.locationService.getCities(
    //   selectedCountry,
    //   selectedState
    // );

    // this.locationService.getCities(selectedCountry, selectedState).subscribe(
    //   (cityList) => {
    //     this.cities = cityList;
    //     this.userForm.patchValue({ city: '' });
    //   },
    //   (error) => {
    //     console.error('Failed to load cities:', error);
    //     this.cities = [];
    //   }
    // );

    this.locationService.getCities(selectedCountry, selectedState).subscribe({
      next: (cityList) => {
        this.cities = cityList;
        this.userForm.patchValue({ city: '' });
      },
      error: (error) => {
        console.error('Failed to load cities:', error);
        this.cities = [];
      },
    });
    this.userForm.patchValue({ city: '' });
  }

  clearSignature(): void {
    this.signaturePreview = null;
    this.userForm.patchValue({ signature: '' });
    this.signatureRequired = true;
  }

  preventDecimal(event: KeyboardEvent): void {
    if (['.', 'e', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }

  handleSignatureSuccess(base64: string): void {
    if (base64) {
      this.signaturePreview = base64;
      this.userForm.patchValue({ signature: base64 });
      this.signatureRequired = false;
    } else {
      this.clearSignature();
    }
  }

  // limitPhoneNumber(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.value.length > 10) {
  //     input.value = input.value.slice(0, 10);
  //     this.userForm.get('phoneNumber')?.setValue(input.value);
  //   }
  // }

  onSignatureChange(event: any): void {
    console.log('upload cll huwa');
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('signature', file);

      this.userService.uploadSignature(formData).subscribe({
        next: (response: any) => {
          this.signaturePreview = environment.fileBaseUrl + response.filePath;
          const control = this.userForm.get('signature');
          control?.setValue(response.filePath);
          control?.markAsTouched();
          control?.markAsDirty();
          control?.updateValueAndValidity();
          this.signatureRequired = false;
        },
        error: () => {
          this.signatureRequired = true;
        },
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.signatureRequired) {
      this.isLoading = true;
      this.userService.createUser(this.userForm.value).subscribe({
        next: (resp: any) => {
          this.isLoading = false;
          alert('User data submitted successfully!');
          this.resetAllFields();
          const pdfPath = resp.data.pdfPath;
          const baseUrl = 'http://localhost:3000';
          const pdfUrl = baseUrl + pdfPath;
          window.open(pdfUrl, '_blank');
        },
        error: () => {
          this.isLoading = false;
          alert('Error submitting data to backend');
        },
      });
    } else {
      this.handleInvalidForm();
    }
  }

  handleInvalidForm(): void {
    this.signatureRequired = !this.signaturePreview;
    this.userForm.markAllAsTouched();
    alert('Please fill out all required fields correctly.');
  }

  resetAllFields(): void {
    this.userForm.reset();
    this.signaturePreview = null;
    this.signatureRequired = false;
    this.predictedAge = null;

    if (this.signatureInput) {
      this.signatureInput.nativeElement.value = '';
    }
  }
}
