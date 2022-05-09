import ReactDOM from 'react-dom';
import React from 'react';

//@ts-ignore
import v86WASM from 'v86/build/v86.wasm';
//@ts-ignore
import seabiosUrl from 'v86/bios/seabios.bin';
//@ts-ignore
import vgabiosUrl from 'v86/bios/vgabios.bin';
//@ts-ignore
import osImgUrl from 'react-95-fiber/binaries/os.img';
//@ts-ignore
import { Win95, Binaries } from 'react-95-fiber';

function App({ binaries }: { binaries: Binaries }) {
    return (
        <Win95
            binaries={binaries}
            className="w95Window"
            id="computer-screen"
        ></Win95>
    );
}

export function render95(component: any) {
    const binaries = {
        v86WASMFn: (param: any) =>
            fetch(v86WASM)
                .then((f) => f.arrayBuffer())
                .then((r) => WebAssembly.instantiate(r, param))
                .then((w) => w.instance.exports),
        seabiosUrl,
        vgabiosUrl,
        osImgUrl,
    };
    ReactDOM.render(<App binaries={binaries} />, component);
}
