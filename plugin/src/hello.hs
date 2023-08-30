{-# LANGUAGE ForeignFunctionInterface #-}

module Main (main) where
import Foreign.C.Types

testing = putStrLn "Hello, World!"

foreign export ccall "testing" testing ::  IO ()

main = testing
