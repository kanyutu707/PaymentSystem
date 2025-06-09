    #include "../headers/transaction.hpp"


    int withdraw(int initialBalance){
        int amount;
        std::cout<<"Input the withdrawal amount: ";
        std::cin>>amount;

        if(initialBalance<=0){
            std::cout<<"Invalid amount the balance must be greater than 0 to withdraw: ";
            return initialBalance;
        }
        if(amount>initialBalance){
            std::cout<<"Invalid amount the withdrawal must be less than the balance available: ";
            return initialBalance;
        }
        initialBalance-=amount;
        std::cout<<"Thank you for withdrawing: "<<amount<<std::endl;
        std::cout<<"The total amount of money remaining in the account is: "<<initialBalance<<std::endl;
        return initialBalance;
    }