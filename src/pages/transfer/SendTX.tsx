import Button from "components/button";
import React from "react";
import useStore from "./useStore";
import styles from "./index.module.less";

const SendTX = () => {
  const { signature, reset } = useStore();

  return (
    <main className={styles.authContainer}>
      <section className="grid space-y-5">
        <h3 className="text-2xl font-medium">Transaction Content:</h3>
        <div className="w-full h-60 bg-gray-200">
          <p className="break-all">{signature}</p>
        </div>
        <p className="text-orange-300">
          Please confirm the transaction content before sending. You are still
          able to cancel the transaction in this step.
        </p>
      </section>
      <footer className="mt-10 flex justify-center">
        <Button className="px-10" onClick={() => reset()}>
          Home
        </Button>
      </footer>
    </main>
  );
};

export default SendTX;

// const testShards = [
//   "801f21e2a54f4690e31514cada55e0d9b4555f3af3a40cbab137c1ed0d8ae445d2b5bcec507d8f6ee8faee49fb54bbe5f206a932f5ea24f7084c97c3d57ab3b4022d734cb84c1a29eeefc8de836e91fd0d524e7b43f49ec6b3ef7ee7bd1bd31f9c9f9035ad570116c4a29a95579d5739aa2c327b92132e2c2b8dceb7575357014040a97f49788cb1d367707b1ab802eeed6",
//   "802f93c54a8f5d21c62a2984757bc1a2b89aaa143de80214b8cf890bd0e4124ba06b624975badadc1a0418a23d2963bbee5d4625ee5593de05d8fa77af84bd98012b3318bb99ff6219ee5a2cdc9cf62bd12488c752e928ed6dff362f6e5672aef2aef5cb418e069d83b5215aabab74c29059b056fed6489993ba56eea406ab928ab1463f5650dd73ac6ee457f111dffc1ee",
//   "8030b227efc01bb1253f3d4eaf2e217b0cdff64ec82c08ce0f984ea6db7ef04e71ded89526f756f2f4eef5bbc04ddb3e1a6bec6718cfb1390e146ee479de087c002643240595e31bf45194c259c26496da46c5ec121db5bbd8004ed8d02da2316801669eea89041b4147b8afffb6259b393581bd6a9565b5bb179e69f535ffe3cce1ec401c085282796997bce8c9db02f0d",
// ];
// "5a69f420a7fc20e94f86e9e6c86aa905c4cc5ed72e258a77c6c5a43c0dadfff6"
