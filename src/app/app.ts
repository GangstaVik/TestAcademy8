import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // needed for [(ngModel)]
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // modern Angular style for single-file components
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // 🧠 State (data)
  title = 'BikeCom';
  devName = 'Kenzox';
  counter = 0;
  sq = 0;
  btnDisabled = true;
  fName = 'Mario';
  isChecked = false;
  selectedOption = 'red';

  // 👕 Style binding example
  myStyle = {
    color: 'blue',
    'font-size': '20px',
    'text-decoration': 'underline',
    'font-weight': 'bold' // fixed typo here (was fontweight)
  };

  // ⚙️ Methods (behavior)
  btnClickMe() {
    this.counter++;
    this.sq = this.counter;
    this.btnDisabled = !this.btnDisabled;
  }

  btnClear() {
    this.counter = 0;
    this.sq = 0;
  }

  inputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.devName = value;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    alert('Form submitted!');
  }

  /* Apply background color to SelectedOption based on the color matching the option selected (red/yellow/green) */
  get selectedOptionStyle() {
    return {
      'background-color': this.selectedOption
    };
  }

}
