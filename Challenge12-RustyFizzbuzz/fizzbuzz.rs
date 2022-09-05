// There is always a main function that is executed first in Rust
fn main() {
    // Loop from 1 to 100
    for i in 1..=100 {
        // Initially was using IF statements but found out about the match function and thought it was better
        // if i % 3 == 0 {
        //     println!("Fizz")
        // } else if i % 5 == 0 {
        //     println!("Buzz")
        // } else if i % 15 == 0 {
        //     println!("FizzBuzz")
        // } else {
        //     println!("{}", i)
        // }

        // Match function is like if/else or switch conditionals, and you can do multiple ones together
        // This way there is no need for multiples of 15, we can just consider multiples of both 3 and 5
        match (i % 3, i % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            (_, _) => println!("{}", i),
        }
    }
}