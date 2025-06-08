#include "../headers/transaction.hpp"


int withdraw(int initalBalance){
    int amount;
    std::cout<<"Input the deposit amount";
    std::cin>>amount;
    initalBalance-=amount;
    std::cout<<"Thank you for withdrawing: "<<amount<<std::endl;
    std::cout<<"The total amount of money remaining in the account is: "<<initalBalance;
    return initalBalance;
}