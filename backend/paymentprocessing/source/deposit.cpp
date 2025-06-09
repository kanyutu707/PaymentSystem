#include "../headers/transaction.hpp"

int deposit(int initialBalance){
    int amount;
    std::cout<<"Input the deposit amount: ";
    std::cin>>amount;

    
    if(amount<=0){
        std::cout<<"Invalid amount the deposit must be greater than 0: ";
        return initialBalance;
    }
    
    initialBalance+=amount;
    std::cout<<"Thank you for depositing: "<<amount<<std::endl;
    std::cout<<"The total amount of money remaining in the account is: "<<initialBalance<<std::endl;
    return initialBalance;
}