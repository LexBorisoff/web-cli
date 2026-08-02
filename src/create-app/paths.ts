import os from 'node:os';
import path from 'node:path';

import { PACKAGE_NAME } from '../constants.js';

class Paths {
  get root(): string {
    return path.join(os.homedir(), `.${PACKAGE_NAME}`);
  }

  get bin(): string {
    return path.join(this.root, 'bin');
  }

  get lib(): string {
    return path.join(this.root, 'lib');
  }

  get distLink(): string {
    return path.join(this.root, '.dist');
  }

  get main(): string {
    return path.join(this.distLink, 'main.js');
  }
}

export const paths = new Paths();
