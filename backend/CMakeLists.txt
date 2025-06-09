cmake_minimum_required(VERSION 3.10)
project(backend)

add_executable(backend main.cpp paymentprocessing/source/transaction.cpp paymentprocessing/source/balance.cpp paymentprocessing/source/deposit.cpp paymentprocessing/source/withdraw.cpp paymentprocessing/source/close.cpp)