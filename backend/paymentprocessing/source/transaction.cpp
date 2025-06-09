#include "../headers/transaction.hpp"
#include <cctype>

int bal=balance();

 void transaction(){

    std::cout <<"---------------------------------------------------"<<std::endl;
    std::cout <<"---------------------------------------------------"<<std::endl;
    std::cout<<"<<<<<<<<<<<<******TRANSACTION PAGE*****>>>>>>>>>>>>>>>"<<std::endl;
    std::cout <<"---------------------------------------------------"<<std::endl;
    std::cout <<"---------------------------------------------------"<<std::endl;
    int choice;
    std::string restart;

    std::cout<<"PLEASE CHOOSE THE TRANSACTION YOU NEED"<<std::endl;
    std::cout<<"1. TO CHECK BALANCE"<<std::endl;
    std::cout<<"2. TO WITHDRAW"<<std::endl;
    std::cout<<"3. TO DEPOSIT"<<std::endl;
    std::cout<<"Enter your choice: ";

    std::cin>>choice;
   switch(choice){
        case 1:
            std::cout<<"The balance in your account is: "<<balance();
            break;
        case 2:
             std::cout<<withdraw(bal);
             break;
        case 3:
            std::cout<<deposit(bal);
            break;
        default:
            std::cout<<"Invalid option please try again"<<std::endl;
            transaction();
   }

   std::cout<<"\n Would you like to initiate another transaction (y/n): ";
   std::cin>>restart;

   std::toupper(restart[0])=='Y'?transaction(): close();
  
}