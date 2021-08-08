// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe('MonsterService', () => {
    it('should works', async () => {
        const text = new Buffer(
            'hKFo2SBSWHo0T0Q5bm9DN0x0eENTdUZiR2ZaN1hac210TTBlZqFupWxvZ2luo3RpZNkgNEYtV0hVbEtUaWJpUkY1ZzV5dkM5aF96d215N3dTSVGjY2lk2SBzQm53NzJtNE82QTFheHVPZ1FxUDBGaDhuSDV6ckRyZQ',
            'base64'
        ).toString();

        expect(text).toBeDefined();
    });
});
