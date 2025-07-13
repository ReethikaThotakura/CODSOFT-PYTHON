#!/usr/bin/env python3
"""
Professional Calculator - Python Command Line Version
A simple yet robust calculator with error handling and user-friendly interface.
"""

import sys
import math

class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        """Addition operation"""
        return a + b
    
    def subtract(self, a, b):
        """Subtraction operation"""
        return a - b
    
    def multiply(self, a, b):
        """Multiplication operation"""
        return a * b
    
    def divide(self, a, b):
        """Division operation with zero-division protection"""
        if b == 0:
            raise ValueError("Error: Division by zero is not allowed!")
        return a / b
    
    def power(self, a, b):
        """Power operation"""
        return a ** b
    
    def square_root(self, a):
        """Square root operation"""
        if a < 0:
            raise ValueError("Error: Cannot calculate square root of negative number!")
        return math.sqrt(a)
    
    def percentage(self, a, b):
        """Calculate percentage: a% of b"""
        return (a / 100) * b
    
    def get_number_input(self, prompt):
        """Get and validate number input from user"""
        while True:
            try:
                value = float(input(prompt))
                return value
            except ValueError:
                print("Invalid input! Please enter a valid number.")
    
    def get_operation_choice(self):
        """Display menu and get operation choice"""
        print("\n" + "="*50)
        print("🧮 PROFESSIONAL CALCULATOR")
        print("="*50)
        print("Available Operations:")
        print("1. Addition (+)")
        print("2. Subtraction (-)")
        print("3. Multiplication (×)")
        print("4. Division (÷)")
        print("5. Power (^)")
        print("6. Square Root (√)")
        print("7. Percentage (%)")
        print("8. View History")
        print("9. Clear History")
        print("0. Exit")
        print("="*50)
        
        while True:
            try:
                choice = int(input("Enter your choice (0-9): "))
                if 0 <= choice <= 9:
                    return choice
                else:
                    print("Invalid choice! Please enter a number between 0-9.")
            except ValueError:
                print("Invalid input! Please enter a valid number.")
    
    def perform_calculation(self, choice):
        """Perform the selected calculation"""
        try:
            if choice == 1:  # Addition
                a = self.get_number_input("Enter first number: ")
                b = self.get_number_input("Enter second number: ")
                result = self.add(a, b)
                operation = f"{a} + {b} = {result}"
                
            elif choice == 2:  # Subtraction
                a = self.get_number_input("Enter first number: ")
                b = self.get_number_input("Enter second number: ")
                result = self.subtract(a, b)
                operation = f"{a} - {b} = {result}"
                
            elif choice == 3:  # Multiplication
                a = self.get_number_input("Enter first number: ")
                b = self.get_number_input("Enter second number: ")
                result = self.multiply(a, b)
                operation = f"{a} × {b} = {result}"
                
            elif choice == 4:  # Division
                a = self.get_number_input("Enter dividend: ")
                b = self.get_number_input("Enter divisor: ")
                result = self.divide(a, b)
                operation = f"{a} ÷ {b} = {result}"
                
            elif choice == 5:  # Power
                a = self.get_number_input("Enter base number: ")
                b = self.get_number_input("Enter exponent: ")
                result = self.power(a, b)
                operation = f"{a} ^ {b} = {result}"
                
            elif choice == 6:  # Square Root
                a = self.get_number_input("Enter number: ")
                result = self.square_root(a)
                operation = f"√{a} = {result}"
                
            elif choice == 7:  # Percentage
                a = self.get_number_input("Enter percentage: ")
                b = self.get_number_input("Enter number: ")
                result = self.percentage(a, b)
                operation = f"{a}% of {b} = {result}"
            
            else:
                return None
            
            # Format result for better display
            if isinstance(result, float) and result.is_integer():
                result = int(result)
            
            # Display result
            print("\n" + "="*30)
            print(f"📊 RESULT: {operation}")
            print("="*30)
            
            # Add to history
            self.history.append(operation)
            
            return result
            
        except ValueError as e:
            print(f"\n❌ {e}")
            return None
        except Exception as e:
            print(f"\n❌ An unexpected error occurred: {e}")
            return None
    
    def display_history(self):
        """Display calculation history"""
        if not self.history:
            print("\n📋 No calculations in history yet!")
            return
        
        print("\n" + "="*40)
        print("📋 CALCULATION HISTORY")
        print("="*40)
        for i, calculation in enumerate(self.history, 1):
            print(f"{i}. {calculation}")
        print("="*40)
    
    def clear_history(self):
        """Clear calculation history"""
        self.history.clear()
        print("\n🗑️ History cleared successfully!")
    
    def run(self):
        """Main calculator loop"""
        print("🚀 Welcome to the Professional Calculator!")
        print("This calculator supports basic arithmetic operations and more.")
        
        while True:
            choice = self.get_operation_choice()
            
            if choice == 0:  # Exit
                print("\n👋 Thank you for using Professional Calculator!")
                print("Goodbye! 🎉")
                sys.exit(0)
            
            elif choice == 8:  # View History
                self.display_history()
            
            elif choice == 9:  # Clear History
                self.clear_history()
            
            else:  # Perform calculation
                self.perform_calculation(choice)
            
            # Ask if user wants to continue
            print("\nPress Enter to continue or type 'exit' to quit...")
            user_input = input().strip().lower()
            if user_input == 'exit':
                print("\n👋 Thank you for using Professional Calculator!")
                print("Goodbye! 🎉")
                break

def main():
    """Main function to run the calculator"""
    calculator = Calculator()
    
    try:
        calculator.run()
    except KeyboardInterrupt:
        print("\n\n👋 Calculator terminated by user. Goodbye! 🎉")
    except Exception as e:
        print(f"\n❌ An unexpected error occurred: {e}")
        print("Please restart the calculator.")

if __name__ == "__main__":
    main()