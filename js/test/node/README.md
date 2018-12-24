###事件循环机制
当操作完成耗时的I/O操作之后，会以事件的形式通知I/O操作的线程完成，线程会在特定的时候来处理这个事件，进行下一步的操作，为了完成异步I/O，线程必须有事件循环的机制，不停的坚持是否有没有完成的事件，依次完成这些事件的处理。
而对于阻塞式I/O，线程遇到耗时的I/O操作会停止继续执行，等待操作的完成，这个时候线程就不能接受其他的操作请求，为了提供吞吐量，必须创建多个线程，每个线程去响应一个客户的请求，但是同一时间，一个cpu核心上面只能运行一个线程，多个线程要想执行就必须在不同的线程之间进行切换。

因此node.js少了多线程中线程的创建，以及线程的切换的开销，线程切换的代价是非常大的，需要为其分配内存，列入调度，同时在线程切换的时候需要执行内存换页等等操作，采用单线程的方式就可以减少这些操作。但是这种编程方式也有缺点，不符合人们的设计思维。
而对于阻塞式I/O，线程遇到耗时的I/O操作会停止继续执行，等待操作的完成，这个时候线程就不能接受其他的操作请求，为了提供吞吐量，必须创建多个线程，每个线程去响应一个客户的请求，但是同一时间，一个cpu核心上面只能运行一个线程，多个线程要想执行就必须在不同的线程之间进行切换。

因此node.js少了多线程中线程的创建，以及线程的切换的开销，线程切换的代价是非常大的，需要为其分配内存，列入调度，同时在线程切换的时候需要执行内存换页等等操作，采用单线程的方式就可以减少这些操作。但是这种编程方式也有缺点，不符合人们的设计思维。