async function bootstrap(): Promise<void> {
    console.log('Nova Systems Lab worker started.');
}

bootstrap().catch((error: unknown) => {
    console.error('Worker failed to start:', error);
    process.exit(1);
});